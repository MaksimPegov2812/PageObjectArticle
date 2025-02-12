
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, YourfeedPage, ProfileSettingsPage, LoginPage } from '../src/pages/index';
import { UserBuilder } from '../src/helpers/builder/index';


const URL_UI = 'https://realworld.qa.guru/';

test.describe('Проверка изменения пароля пользователем', () => {
    
    test('Проверка изменения пароля пользователем', async ({ page }) => {
        //объявление констант
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const yourfeedPage = new YourfeedPage(page);
        const profileSettingsPage = new ProfileSettingsPage(page);
        const loginPage = new LoginPage(page);
        const userBuilder = new UserBuilder().addEmail().addPassword().addUsername().generate();
        //данные нового пароля пользователя
        const newpassword = {
            password: faker.internet.password()            
        };

        //действие на Главной странице     
        await mainPage.open(URL_UI); //открытие страницы
        await mainPage.gotoRegister(); //клик на кнопку регистрации
        await registerPage.register(userBuilder.username, userBuilder.email, userBuilder.password);//регистрация пользователя

        //действие на странице YourfeedPage пользователя клик на кнопку с именем пользователя, где нажимаем на Settings
        await yourfeedPage.gotoProfile();

        //Клик на кнопку "Settings"
        await yourfeedPage.gotoSettings();

        //Изменение пароля на странице настроек профиля
        await profileSettingsPage.tochangePasswordProfile(newpassword.password);
        
        //Выйти из профиля на сайте
        await mainPage.gotoLogout();

        //Jткрыть главную страницу
        await mainPage.open(URL_UI);

        //Rлик на кнопку Login
        await mainPage.gotoLogin();
        
        //Введение старой почты и нового пароля
        await loginPage.gologin(userBuilder.email, newpassword.password);

        //Ожидаемй результат совпадения имени пользователя
        await expect(yourfeedPage.profileNameField).toContainText(userBuilder.username);
    });
    
})
