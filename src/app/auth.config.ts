import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { getDeepFromObject} from '@nebular/auth/helpers';
import { NgEmailPassAuthProviderConfig } from '@nebular/auth/providers/email-pass-auth.options';

export const authConfig: NgEmailPassAuthProviderConfig = {
  baseEndpoint: 'http://localhost:8080',
  login: {
    endpoint: '/api/auth/login',
    method: 'post',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Login/Email combination is not correct, please try again.'],
    defaultMessages: ['You have been successfully logged in.'],
  },
  register: {
    endpoint: '/api/auth/register',
    method: 'post',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully registered.'],
  },
  logout: {
    endpoint: '/api/auth/logout',
    method: 'delete',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully logged out.'],
  },
  requestPass: {
    endpoint: '/api/auth/request-pass',
    method: 'post',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Reset password instructions have been sent to your email.'],
  },
  resetPass: {
    endpoint: '/api/auth/reset-pass',
    method: 'put',
    redirect: {
      success: '/',
      failure: null,
    },
    resetPasswordTokenKey: 'reset_password_token',
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Your password has been successfully changed.'],
  },
  token: {
    key: 'token',
  },
  errors: {
    key: 'data.errors',
  },
  messages: {
    key: 'data.messages',
  },
};
