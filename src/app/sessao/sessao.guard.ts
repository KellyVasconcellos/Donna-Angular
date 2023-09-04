import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { SessaoService } from './sessao.service';

export const guard: CanActivateFn = (route, state) => {
  const sessao = inject(SessaoService).validaSessaoCliente()
  const router = inject(Router);

  if(sessao){
    return true
  } else {
    router.navigate(['login']);
    return false
  }
};
