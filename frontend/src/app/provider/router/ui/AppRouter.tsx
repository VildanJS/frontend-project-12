import React, { type FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/404'
import { SignupPage } from '@/pages/SignupPage'
import { Layout } from '@/shared/layout/Layout'

import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter: FC = () => {
    const routesForPublic = [
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/signup',
            element: <SignupPage />,
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]
    const protectedMainPage =
        {
            path: '/',
            element: <ProtectedRoute><MainPage /></ProtectedRoute>,
        }


    const router = createBrowserRouter([
            {
                element: <Layout />,
                children: [
                    ...routesForPublic,
                    protectedMainPage
                ],
            },
        ])

    return <RouterProvider router={router} />
}
