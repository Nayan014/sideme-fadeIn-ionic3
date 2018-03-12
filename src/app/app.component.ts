import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Slides } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import {style, state, animate, transition, trigger} from '@angular/core';

@Component({
  templateUrl: 'app.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(200, style({opacity:1})) 
        /*
         style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        */
      ]),
    ])
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  @ViewChild(Slides) slides: Slides;

  rootPage: any = HomePage;

  plateformBase: any;

  dummyProduct: Array<{name:string}>;
  dummySubProduct: Array<{name:string}>;
  pages: Array<{title: string, component: any}>;

  SecondSlide: boolean = false;
  FirstSlide: boolean = true;
  secondSlideTitle: any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();

    if (this.platform.is('ios')) {
      this.plateformBase = 'ios';
    }
    else if(this.platform.is('android')){
      this.plateformBase = 'android';
    }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

    this.dummyProduct = [
      { 
        name: 'Product'
      },
      {
        name: 'Sale'
      },
      { 
        name: 'Inventory'
      },
      {
        name: 'Product Line'
      }
    ];

    this.dummySubProduct = [
      { 
        name: 'sub menu 1'
      },
      {
        name: 'sub menu 2'
      },
      { 
        name: 'sub menu 3'
      },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  thirdSlide(data,index){
    console.log(data);
  }

  secondSlide(data,index){
    this.FirstSlide = false; 
    this.SecondSlide = true;
    this.secondSlideTitle = data.name;
  }

  back(){
    this.SecondSlide = false;
    this.FirstSlide = true;
  }
}
