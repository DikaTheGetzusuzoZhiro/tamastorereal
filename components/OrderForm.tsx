"use client";
import { useState } from "react";
import { supabase, supabaseReady } from "@/lib/supabase";
import { waLink } from "@/lib/config";

export default function OrderForm({ kind, itemId, itemName, price }: {kind:string;itemId:string;itemName:string;price:number}) {
 const [username,setUsername]=useState(""); const [contact,setContact]=useState(""); const [note,setNote]=useState(""); const [sending,setSending]=useState(false); const [done,setDone]=useState("");
 async function submit(e:React.FormEvent){e.preventDefault(); if(!username.trim()||!contact.trim())return alert("Lengkapi username dan nomor WhatsApp.");
 setSending(true);
 const payload={kind,item_id:itemId,item_name:itemName,price,username:username.trim(),customer_contact:contact.trim(),note:note.trim(),status:"pending"};
 if(supabaseReady){const {data,error}=await supabase.from("orders").insert(payload).select("order_code").single(); if(error){alert("Pesanan belum tersimpan: "+error.message);setSending(false);return;} setDone(data.order_code);}
 else setDone("DEMO-"+Date.now().toString().slice(-6));
 const msg=`Halo Tama Store, saya sudah membuat pesanan.\nKode: ${done || "akan dikirim admin"}\nProduk: ${itemName}\nHarga: Rp${price.toLocaleString("id-ID")}\nUsername: ${username}\nKontak: ${contact}\nCatatan: ${note || "-" }\nMohon kirim instruksi pembayaran QRIS.`;
 window.open(waLink(msg),"_blank","noopener,noreferrer"); setSending(false);
 }
 return <form className="order-form" onSubmit={submit}><label>Username Roblox<input value={username} onChange={e=>setUsername(e.target.value)} required placeholder="Username" /></label><label>Nomor WhatsApp aktif<input value={contact} onChange={e=>setContact(e.target.value)} required placeholder="08xxxxxxxxxx" /></label><label>Catatan (opsional)<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Catatan pesanan" /></label><button className="button button-primary full" disabled={sending}>{sending?"Memproses...":"Buat Pesanan & Konfirmasi Admin"}</button>{done&&<p className="success">Kode pesanan: <b>{done}</b></p>}<small>Setelah pesanan dibuat, CS akan mengirim QRIS dan memverifikasi pembayaran secara manual.</small></form>;
}
