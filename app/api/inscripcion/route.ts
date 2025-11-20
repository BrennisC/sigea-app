import { supabase } from "@/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabase
        .from("inscripcion")
        .select(`
      id_inscripcion,
      fecha_inscripcion,
      usuario:usuario_id (nombres, apellidos, correo),
      actividad:actividad_id (titulo, fecha_inicio),
      estado_inscripcion:estado_id (codigo)
    `);

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(data);
}
