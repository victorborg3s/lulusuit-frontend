export class Usuario {
  id: number;
  username: string;
  password: string;
  authority: string;
  enabled: boolean;
  name: string;
  imageBase64: string;

  constructor() {
    this.authority = "ROLE_USER";
    this.enabled = true;
  }

  getAuthority(): string {
    if (this.authority == "ROLE_USER") {
      return "Usuário Básico";
    } else if (this.authority == "ROLE_ADMIN") {
      return "Usuário Administrador";
    }
  }

}
