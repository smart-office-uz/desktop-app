/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SomePageImport } from './routes/some-page'
import { Route as SignInImport } from './routes/sign-in'
import { Route as RegisterInstanceImport } from './routes/register-instance'
import { Route as ChatImport } from './routes/chat'
import { Route as IndexImport } from './routes/index'
import { Route as ChatChatIdImport } from './routes/chat.$chatId'

// Create/Update Routes

const SomePageRoute = SomePageImport.update({
  path: '/some-page',
  getParentRoute: () => rootRoute,
} as any)

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

const ChatRoute = ChatImport.update({
  path: '/chat',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ChatChatIdRoute = ChatChatIdImport.update({
  path: '/$chatId',
  getParentRoute: () => ChatRoute,
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
    '/chat': {
      id: '/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof ChatImport
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
    '/some-page': {
      id: '/some-page'
      path: '/some-page'
      fullPath: '/some-page'
      preLoaderRoute: typeof SomePageImport
      parentRoute: typeof rootRoute
    }
    '/chat/$chatId': {
      id: '/chat/$chatId'
      path: '/$chatId'
      fullPath: '/chat/$chatId'
      preLoaderRoute: typeof ChatChatIdImport
      parentRoute: typeof ChatImport
    }
  }
}

// Create and export the route tree

interface ChatRouteChildren {
  ChatChatIdRoute: typeof ChatChatIdRoute
}

const ChatRouteChildren: ChatRouteChildren = {
  ChatChatIdRoute: ChatChatIdRoute,
}

const ChatRouteWithChildren = ChatRoute._addFileChildren(ChatRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/chat': typeof ChatRouteWithChildren
  '/register-instance': typeof RegisterInstanceRoute
  '/sign-in': typeof SignInRoute
  '/some-page': typeof SomePageRoute
  '/chat/$chatId': typeof ChatChatIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/chat': typeof ChatRouteWithChildren
  '/register-instance': typeof RegisterInstanceRoute
  '/sign-in': typeof SignInRoute
  '/some-page': typeof SomePageRoute
  '/chat/$chatId': typeof ChatChatIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/chat': typeof ChatRouteWithChildren
  '/register-instance': typeof RegisterInstanceRoute
  '/sign-in': typeof SignInRoute
  '/some-page': typeof SomePageRoute
  '/chat/$chatId': typeof ChatChatIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/chat'
    | '/register-instance'
    | '/sign-in'
    | '/some-page'
    | '/chat/$chatId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/chat'
    | '/register-instance'
    | '/sign-in'
    | '/some-page'
    | '/chat/$chatId'
  id:
    | '__root__'
    | '/'
    | '/chat'
    | '/register-instance'
    | '/sign-in'
    | '/some-page'
    | '/chat/$chatId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ChatRoute: typeof ChatRouteWithChildren
  RegisterInstanceRoute: typeof RegisterInstanceRoute
  SignInRoute: typeof SignInRoute
  SomePageRoute: typeof SomePageRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ChatRoute: ChatRouteWithChildren,
  RegisterInstanceRoute: RegisterInstanceRoute,
  SignInRoute: SignInRoute,
  SomePageRoute: SomePageRoute,
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
        "/chat",
        "/register-instance",
        "/sign-in",
        "/some-page"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/chat": {
      "filePath": "chat.tsx",
      "children": [
        "/chat/$chatId"
      ]
    },
    "/register-instance": {
      "filePath": "register-instance.tsx"
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    },
    "/some-page": {
      "filePath": "some-page.tsx"
    },
    "/chat/$chatId": {
      "filePath": "chat.$chatId.tsx",
      "parent": "/chat"
    }
  }
}
ROUTE_MANIFEST_END */
