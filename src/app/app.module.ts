// Basicamente declara as rotas, modulos e componentes do app

import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JogoComponent } from './jogo/jogo.component';
import { RegrasComponent } from './regras/regras.component';
import { RankingComponent } from './ranking/ranking.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavheadComponent } from './navhead/navhead.component';

registerLocaleData(localePt, 'pt')

@NgModule({
  declarations: [ AppComponent,
                  HomeComponent,
                  JogoComponent,
                  RegrasComponent,
                  RankingComponent,
                  NavheadComponent],
  imports: [  BrowserModule,
              FormsModule,
              AppRoutingModule,
              HttpClientModule],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
