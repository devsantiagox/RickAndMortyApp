import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener datos del body
    const { email, password } = await request.json();

    // Validar campos requeridos
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Por favor ingresa email y contraseña',
        },
        { status: 400 }
      );
    }

    // Buscar usuario por email (incluir password)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Credenciales inválidas',
        },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: 'Credenciales inválidas',
        },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    // Retornar respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en login:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Error al iniciar sesión',
      },
      { status: 500 }
    );
  }
}

