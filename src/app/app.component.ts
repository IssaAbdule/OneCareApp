// import { Component } from '@angular/core';

import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'custom_application';

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadForgetPasswordComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ForgetPasswordComponent);
    this.container.clear(); // Clear any existing components
    this.container.createComponent(componentFactory);
  }
}
