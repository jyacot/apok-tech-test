import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodesRoutingModule } from './nodes-routing.module';
import { NodesComponent } from './pages/nodes/nodes.component';
import { HttpClientModule } from '@angular/common/http';
import { NodesService } from './services/nodes.service';
import { NodeComponent } from './pages/node/node.component';
import { NodeCardComponent } from './components/node-card/node-card.component';
import { NodeAddComponent } from './components/node-add/node-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    NodesComponent,
    NodeComponent,
    NodeCardComponent,
    NodeAddComponent,
  ],
  imports: [
    CommonModule,
    NodesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [NodesService],
})
export class NodesModule {}
