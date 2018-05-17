import { NbAclOptions } from '@nebular/security';

export const accessConfig: NbAclOptions = {
  accessControl: {
    ROLE_USER: {
      createUpdate: ['clientes', 'pagamentos', 'pedido', 'itens'],
      read: ['clientes', 'pagamentos', 'pedido', 'itens'],
    },
    ROLE_ADMIN: {
      parent: 'ROLE_USER',
      createUpdate: ['usuarios'],
      read: ['usuarios'],
      delete: '*',
    },
  },
}
