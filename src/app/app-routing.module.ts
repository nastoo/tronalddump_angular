import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTargetsComponent} from './all-targets/all-targets.component';
import { GameComponent} from './game/game.component';
import { HistoriqueComponent} from './historique/historique.component';
import { SingularTargetComponent } from './singular-target/singular-target.component';



const routes: Routes = [
  {
    path:'targets',
    component: AllTargetsComponent,
  },
  {
    path:'',
    component: GameComponent,
  },
  {
    path:'history',
    component: HistoriqueComponent,
  },
  {
    path:'target/:name',
    component:SingularTargetComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
