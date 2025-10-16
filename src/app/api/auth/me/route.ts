import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    // Extraer token del header
    const authorization = request.headers.get('authorization');
    const token = extractTokenFromHeader(authorization || '');

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'No se proporcionó token de autenticación',
        },
        { status: 401 }
      );
    }

    // Verificar token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token inválido o expirado',
        },
        { status: 401 }
      );
    }

    // Conectar a la base de datos
    await connectDB();

    // Buscar usuario
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Usuario no encontrado',
        },
        { status: 404 }
      );
    }

    // Retornar datos del usuario
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al verificar usuario:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Error al verificar usuario',
      },
      { status: 500 }
    );
  }
}

