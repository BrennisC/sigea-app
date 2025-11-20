import { supabaseAdmin } from "@/supabase/supabase";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
    const id = Number(params.id);

    const { data, error } = await supabaseAdmin
        .from("usuario")
        .select("*")
        .eq("id_usuario", id)
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
        .from("usuario")
        .update({
            nombres: body.nombres,
            apellidos: body.apellidos,
            correo: body.correo?.toLowerCase(),
        })
        .eq("id_usuario", id)
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
        .from("usuario")
        .delete()
        .eq("id_usuario", id);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Usuario eliminado" });
}
