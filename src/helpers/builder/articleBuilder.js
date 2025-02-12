
import { faker } from '@faker-js/faker';

//Builder создания нового пользователя
export class ArticleBuilder {
    addTitle() {
        this.articleTitle = faker.lorem.sentence(3);
        return this;
    }
    addArticleAbout(symbol = 10) {
        this.articleAbout = faker.lorem.sentence({ min: 3, max: 5 });
        return this;
    }
    addContent() {
        this.articleContent = faker.lorem.text();
        return this;
    }
    addTags() {
        this.articleTags = faker.lorem.text(1);
        return this;
    }
    generateArticle() {
        return {
            title: this.articleTitle,
            articleAbout: this.articleAbout,
            content: this.articleContent,
            tags: this.articleTags
        };
    }
}
