export interface formClientInterface {
  name: string;
  email: string;
  company: string;
  typework: string;
  description: string;
}

export interface typeProject {
  id?: number;
  title: string;
  description: string;
  image: imagenes;
}
export interface imagenes {
  image: string;
}

export interface login {
  id?: string;
  email: string;
  password: string;
}
export interface register {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
