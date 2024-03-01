import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(
    private _OAuthService:OAuthService,
  ){ 
  }

  initLogin(){
    const config: AuthConfig={
      issuer:'http://accounts.google.com',
      strictDiscoveryDocumentValidation:false,
      clientId:'723070617595-kg5foritv4ij2lujnlluf18pfb54d19q.apps.googleusercontent.com',
      redirectUri: location.origin+'/inicio',
      scope:'openid profile email'
    }
    this._OAuthService.configure(config);
    this._OAuthService.setupAutomaticSilentRefresh();
    this._OAuthService.loadDiscoveryDocumentAndTryLogin()
  }

  login(){
    this._OAuthService.initImplicitFlow();
  }
  logout(){
    this._OAuthService.logOut()
  }

  getProfile(){
    return this._OAuthService.getIdentityClaims();
  }
}
