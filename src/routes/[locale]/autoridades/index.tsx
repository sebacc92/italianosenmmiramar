import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import AutoridadesImg from '~/media/autoridades.jpg?jsx';
import { _ } from "compiled-i18n";

export default component$(() => {
    useStylesScoped$(`
        .autoridades-header {
            background: linear-gradient(135deg, 
                rgba(0, 140, 69, 0.9) 0%, 
                rgba(255, 255, 255, 0.9) 50%, 
                rgba(206, 43, 55, 0.9) 100%
            );
            padding: 3rem 1rem;
            position: relative;
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .autoridades-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            z-index: 1;
        }

        .autoridades-header > * {
            position: relative;
            z-index: 2;
        }

        .autoridades-header h1 {
            display: inline-block;
            padding: 0.5rem 1.5rem;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 8px;
            margin-bottom: 1rem;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }

        .consejo-directivo {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .tribunal-honor {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .presidente-honorario {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .miembro {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .miembro:last-child {
            border-bottom: none;
        }

        .cargo {
            font-weight: bold;
            color: #333;
        }

        .nombre {
            font-weight: 500;
            color: #555;
        }

        .section-title {
            color: #333;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid;
            border-image: linear-gradient(to right, #006847, #c8102e) 1;
            display: inline-block;
        }

        .team-photo {
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 2rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .team-photo img {
            width: 100%;
            height: auto;
            display: block;
        }

        @media (max-width: 640px) {
            .miembro {
                flex-direction: column;
                padding: 0.5rem 0;
            }
            
            .cargo {
                margin-bottom: 0.25rem;
            }
        }
    `)

    return (
        <div class="container mx-auto px-4 py-8">
            <div class="autoridades-header">
                <h1 class="text-4xl md:text-5xl font-bold">{_`Autoridades`}</h1>
                <p class="text-xl">{_`Consejo Directivo del Círculo Italiano`}</p>
            </div>

            <div class="team-photo">
                <AutoridadesImg
                    alt={_`Consejo Directivo del Círculo Italiano`}
                />
                <div class="text-center mt-2 text-sm text-gray-600">
                    {_`Miembros del Consejo Directivo - Período 2023-2024`}
                </div>
            </div>

            <div class="consejo-directivo">
                <h2 class="text-2xl font-bold section-title">{_`Miembros del Consejo Directivo`}</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="miembro">
                        <span class="cargo">{_`Presidente:`}</span>
                        <span class="nombre">Dr. Marco Bianchi</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vicepresidente Primero:`}</span>
                        <span class="nombre">Dr. Alberto Rossi</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vicepresidente Segundo:`}</span>
                        <span class="nombre">Sr. Ricardo Lombardi</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Secretario:`}</span>
                        <span class="nombre">Dr. Gabriel Marconi</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Prosecretario:`}</span>
                        <span class="nombre">Dr. Leonardo Ferrari</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Tesorero:`}</span>
                        <span class="nombre">Dr. Claudio Moretti</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Protesorero:`}</span>
                        <span class="nombre">Sr. Gustavo Esposito</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Titular:`}</span>
                        <span class="nombre">Sr. Paolo Romano</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Titular:`}</span>
                        <span class="nombre">Ing. Lorenzo Martini</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Titular:`}</span>
                        <span class="nombre">Lic. Andrea Conti</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Titular:`}</span>
                        <span class="nombre">Sr. Roberto Marino</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Suplente:`}</span>
                        <span class="nombre">Lic. Valentina Ricci</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Suplente:`}</span>
                        <span class="nombre">Dr. Massimo Caruso</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Suplente:`}</span>
                        <span class="nombre">Lic. Sofia Greco</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Suplente:`}</span>
                        <span class="nombre">Lic. Federico Longo</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Revisora de Cuentas Titular:`}</span>
                        <span class="nombre">Dra. Elena Rizzo</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Revisor de Cuentas Titular:`}</span>
                        <span class="nombre">Sr. Antonio Vitali</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Revisor de Cuentas Suplente:`}</span>
                        <span class="nombre">Prof. Laura Costa</span>
                    </div>
                </div>
            </div>
            
            <div class="tribunal-honor">
                <h2 class="text-2xl font-bold section-title">{_`Tribunal de Honor`}</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="miembro">
                        <span class="cargo">{_`Presidente:`}</span>
                        <span class="nombre">Lic. Silvio Santoro</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vicepresidente:`}</span>
                        <span class="nombre">Dr. Matteo Fiorelli</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Secretaria:`}</span>
                        <span class="nombre">Sra. Luciana Mancini</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Titular:`}</span>
                        <span class="nombre">Dr. Stefano Bruno</span>
                    </div>
                    
                    <div class="miembro">
                        <span class="cargo">{_`Vocal Suplente:`}</span>
                        <span class="nombre">Ing. Franco Colombo</span>
                    </div>
                </div>
            </div>
            
            <div class="presidente-honorario">
                <h2 class="text-2xl font-bold section-title">{_`Presidente Honorario`}</h2>
                
                <div class="grid grid-cols-1">
                    <div class="miembro">
                        <span class="cargo">{_`Presidente Honorario:`}</span>
                        <span class="nombre">Dr. Alessandro Galli</span>
                    </div>
                </div>
                
                <div class="text-right text-sm text-gray-600 mt-4">
                    Julio 2024
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Autoridades - Círculo Italiano Miramar`,
    meta: [
        {
            name: "description",
            content: _`Conozca a los miembros del Consejo Directivo, Tribunal de Honor y autoridades del Círculo Italiano de Miramar.`,
        },
    ],
};
