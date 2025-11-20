import { supabaseAdmin } from "@/supabase/supabase";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
    const id = Number(params.id);

    const { data, error } = await supabaseAdmin
        .from("actividad")
        .select(`
      *,
      estado_actividad:estado_id (codigo, etiqueta),
      organizador:organizador_id (nombres, apellidos),
      tipo_actividad:tipo_id (nombre_actividad)
    `)
        .eq("id_actividad", id)
        .single();

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: Params) {
    const id = Number(params.id);
    const body = await req.json();

    const { data, error } = await supabaseAdmin
        .from("actividad")
        .update({
            titulo: body.titulo,
            descripcion: body.descripcion,
            fecha_inicio: body.fecha_inicio,
            fecha_fin: body.fecha_fin,
            estado_id: body.estado_id,
            tipo_id: body.tipo_id,
            lugar: body.lugar,
        })
        .eq("id_actividad", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: Params) {
    const id = Number(params.id);

    const { error } = await supabaseAdmin
        .from("actividad")
        .delete()
        .eq("id_actividad", id);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Actividad eliminada" });
}
