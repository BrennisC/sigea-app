import { supabaseAdmin } from "@/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabaseAdmin
        .from("actividad")
        .select(`
      id_actividad,
      titulo,
      descripcion,
      fecha_inicio,
      fecha_fin,
      lugar,
      estado_actividad:estado_id (id_estado_actividad, codigo, etiqueta),
      organizador:organizador_id (id_usuario, nombres, apellidos, correo),
      tipo_actividad:tipo_id (id_tipo, nombre_actividad)
    `)
        .order("id_actividad", { ascending: true });

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const {
        titulo,
        descripcion,
        fecha_inicio,
        fecha_fin,
        estado_id,
        organizador_id,
        tipo_id,
        lugar,
    } = body;

    const { data, error } = await supabaseAdmin
        .from("actividad")
        .insert({
            titulo,
            descripcion,
            fecha_inicio, // 'YYYY-MM-DD'
            fecha_fin,
            estado_id,
            organizador_id,
            tipo_id,
            lugar,
        })
        .select()
        .single();

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}
