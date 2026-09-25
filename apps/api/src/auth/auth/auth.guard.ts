import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Inicializa o app do Firebase Admin se ainda não existir
if (getApps().length === 0) {
  initializeApp({
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
      const decodedToken = await getAuth().verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
