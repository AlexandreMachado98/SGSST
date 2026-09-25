import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

// Inicializa o app do Firebase Admin. Na produção, as credenciais virão de variáveis de ambiente do GCP.
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'sgsst-dev'
  });
}

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Nenhum token Bearer fornecido');
    }
    
    try {
      // Valida o JWT emitido pelo Firebase
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Injeta os dados do usuário (uid, tenant_id, role) no request para uso posterior nos controllers e RLS
      request.user = decodedToken;
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
