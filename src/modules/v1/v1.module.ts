import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import AdminPanelModule from './admin/admin-panel.module';
import TradingModule from './trading/trading.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/trade', module: TradingModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    UsersModule,
    TradingModule,
    AdminPanelModule,
  ],
})
export default class V1Module {}
