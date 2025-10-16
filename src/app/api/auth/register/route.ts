import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener datos del body
    const { name, email, password } = await request.json();

    // Validar campos requeridos
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Por favor completa todos los campos',
        },
        { status: 400 }
      );
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres',
        },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'El email ya está registrado',
        },
        { status: 409 }
      );
    }

    // Crear nuevo usuario
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

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
        message: 'Usuario registrado exitosamente',
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error al registrar usuario',
      },
      { status: 500 }
    );
  }
}

