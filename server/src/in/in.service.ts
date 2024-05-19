import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { In } from './in.schema';
import { Model } from 'mongoose';
import { Browser, Builder, By, WebDriver } from 'selenium-webdriver';
import { User } from 'src/auth/user.schema';

@Injectable()
export class InService {
  constructor(
    @InjectModel(In.name) private InModel: Model<In>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  private driver: WebDriver;

  async scrapeData(url: string, email: string): Promise<any> {
    try {
      this.driver = await new Builder().forBrowser(Browser.CHROME).build();

      await this.driver.get('https://www.linkedin.com/login/');
      const username = await this.driver.findElement(By.id('username'));
      await username.sendKeys('ahmedzakaria6868@gmail.com');

      const password = await this.driver.findElement(By.id('password'));
      await password.sendKeys('ahmed2002zakria');

      await this.driver
        .findElement(By.className('btn__primary--large from__button--floating'))
        .click();

      await this.driver.get(url);

      await this.driver.sleep(10000);
      const getName = await this.driver.findElement(
        By.className('text-heading-xlarge'),
      );
      const name = await getName.getText();

      const getTitle = await this.driver.findElement(
        By.xpath(
          '//*[@id="profile-content"]/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]',
        ),
      );
      const title = await getTitle.getText();

      const getAddress = await this.driver.findElement(
        By.xpath(
          '//*[@id="profile-content"]/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[1]',
        ),
      );
      const address = await getAddress.getText();

      const getPhoto = await this.driver.findElement(By.id('ember35'));

      const photo = await getPhoto.getAttribute('src');

      const { _id } = await this.userModel.findOne({ email });

      const dataObj = { name, title, address, photo, url, user: _id };

      await this.InModel.create(dataObj);
    } catch (err) {
      console.log(err);
    } finally {
      if (this.driver) {
        await this.driver.quit();
      }
    }
  }
  async getScrapeData(user): Promise<any> {
    const { _id } = user;
    return this.InModel.findOne({ user: _id });
  }
}
