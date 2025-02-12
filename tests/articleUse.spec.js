
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, YourfeedPage, AddArticlePage, ArticlePage } from '../src/pages/index';
import { ArticleBuilder } from '../src/helpers/builder/index';


const URL_UI = 'https://realworld.qa.guru/';

test.describe('Авторизация пользователя', () => {
    test.beforeEach(async ({ page }) => {
        //объявление констант
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const yourfeedPage = new YourfeedPage(page);
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.person.firstName()
        };
        //действие на Главной странице     
        await mainPage.open(URL_UI); //открытие страницы
        await mainPage.gotoRegister(); //клик на кнопку регистрации
        await registerPage.register(user.username, user.email, user.password); //регистрация пользователя       
    });        

    test('Создание новой публикации', async ({ page }) => {
        //Объявление констант
        const yourFeedPage = new YourfeedPage(page);
        const addArticlePage = new AddArticlePage(page); 
        const articleBuilder = new ArticleBuilder().addTitle().addArticleAbout().addContent().addTags().generateArticle();
        const articlePage = new ArticlePage(page);        

        //переход на страницу создания публикации https://realworld.qa.guru/#/editor
        await yourFeedPage.gotoArticle();
        
        //создание новой публикации и переход на страницу созданной публикации
        await addArticlePage.tocreateArticle(articleBuilder.title, articleBuilder.articleAbout, articleBuilder.content, articleBuilder.tags);
        
        //сравнение заголовков публикации при ее создании и на странице новой публикации        
        await expect(articlePage.newArticleTitle).toContainText(articleBuilder.title);
    });

    test('Создание комментария к публикации', async ({ page }) => {
        //Объявление констант
        const yourFeedPage = new YourfeedPage(page);
        const addArticlePage = new AddArticlePage(page);
        const articlePage = new ArticlePage(page);
        const articleBuilder = new ArticleBuilder().addTitle().addArticleAbout().addContent().addTags().generateArticle();        
        const commentarticle = {
            comment: faker.lorem.text(),
        };

        //переход на страницу создания публикации https://realworld.qa.guru/#/editor
        await yourFeedPage.gotoArticle();
        //создание новой публикации и переход на страницу созданной публикации
        await addArticlePage.tocreateArticle(articleBuilder.title, articleBuilder.articleAbout, articleBuilder.content, articleBuilder.tags);    
        //Написание комментария к созданное публикации        
        await articlePage.topostCommentArticle(commentarticle.comment);
        //Ссравнение текста написанного и опубликованного комментария к созданной публикации        
        await expect(addArticlePage.newCommentField).toContainText(commentarticle.comment);
      });
})