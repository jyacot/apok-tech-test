import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NodeAddComponent } from './components/node-add/node-add.component';
import { NodeComponent } from './pages/node/node.component';
import { NodesComponent } from './pages/nodes/nodes.component';

const routes: Routes = [
  {
    path: '',
    component: NodesComponent,
  },
  {
    path: ':id',
    component: NodeComponent,
  },
  {
    path: ':id/newChild',
    component: NodeAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NodesRoutingModule {}
