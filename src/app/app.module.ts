import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule  
  ],
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient()],
  bootstrap: [AppComponent] 
})
export class AppModule { }
