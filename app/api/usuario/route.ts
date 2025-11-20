import { supabaseAdmin } from "@/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("usuario")
    .select(`
      id_usuario,
      nombres,
      apellidos,
      correo,
      created_at,
      updated_at,
      usuario_rol (
        rol (
          nombre_rol
        )
      )
    `);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}


export async function POST(request: Request) {
  const body = await request.json();

  const { nombres, apellidos, correo, password_hash } = body;

  const { data, error } = await supabaseAdmin
    .from("usuario")
    .insert({
      nombres,
      apellidos,
      correo: correo.toLowerCase(),
      password_hash,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}

