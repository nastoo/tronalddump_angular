import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTargetsComponent} from './all-targets/all-targets.component';
import { GameComponent} from './game/game.component';


const routes: Routes = [
  {
    path:'all-targets',
    component: AllTargetsComponent,
  },
  {
    path:'',
    component: GameComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
