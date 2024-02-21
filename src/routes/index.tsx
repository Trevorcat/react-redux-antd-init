import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { ROUTE_LIST } from './constants';
import { IFMenuBase } from './types';
import Pages from './pages';

const CRouter = () => {
  return (
    <Routes>
      {ROUTE_LIST.map((r: IFMenuBase) => {
        console.log(r.key, r.component)
        const Component = r.component && Pages[r.component];
        const title = r.title;

        return (
            <Route
                key={r.key}
                path={r.key}
                element={
                    <DocumentTitle title={String(title)}>
                        <Component />
                    </DocumentTitle>
                }
            />
        );
      })}
      <Route element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default CRouter;