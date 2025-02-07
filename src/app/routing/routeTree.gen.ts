/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignInImport } from './routes/sign-in'
import { Route as RegisterInstanceImport } from './routes/register-instance'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SignInRoute = SignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const RegisterInstanceRoute = RegisterInstanceImport.update({
  id: '/register-instance',
  path: '/register-instance',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/register-instance': {
      id: '/register-instance'
      path: '/register-instance'
      fullPath: '/register-instance'
      preLoaderRoute: typeof RegisterInstanceImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/register-instance': typeof RegisterInstanceRoute
  '/sign-in': typeof SignInRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/register-instance': typeof RegisterInstanceRoute
  '/sign-in': typeof SignInRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/register-instance': typeof RegisterInstanceRoute
  '/sign-in': typeof SignInRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/register-instance' | '/sign-in'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/register-instance' | '/sign-in'
  id: '__root__' | '/' | '/register-instance' | '/sign-in'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  RegisterInstanceRoute: typeof RegisterInstanceRoute
  SignInRoute: typeof SignInRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  RegisterInstanceRoute: RegisterInstanceRoute,
  SignInRoute: SignInRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/register-instance",
        "/sign-in"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/register-instance": {
      "filePath": "register-instance.tsx"
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
