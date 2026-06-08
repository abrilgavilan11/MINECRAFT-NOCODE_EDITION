require('dotenv/config');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const dataLocal = [
  {"id":"1","name":"Zombie","type":"MOB","image":"https://mc-heads.net/body/zombie/100","behavior":"Hostil","size":"Mediano","description":"El enemigo más común del juego."},
  {"id":"2","name":"Espada de Diamante","type":"ITEM","image":"https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png?8427d","behavior":"Ataque","size":"Herramienta","description":"Arma legendaria de alta durabilidad."},
  {"id":"3","name":"Creeper","type":"MOB","image":"https://minecraft.wiki/images/Creeper_JE3_BE1.png?dc7b2","behavior":"Hostil","size":"Mediano","description":"Si lo escuchas sisear, ¡corre!"},
  {"id":"4","name":"Pico de Diamante","type":"ITEM","image":"https://minecraft.wiki/images/Diamond_Pickaxe_JE3_BE3.png?91891","behavior":"Minería","size":"Herramienta","description":"Necesario para picar obsidiana. Tiene mucha resistencia."},
  {"id":"5","name":"Esqueleto","type":"MOB","image":"https://minecraft.wiki/images/thumb/Lefthandedskeleton.png/200px-Lefthandedskeleton.png?2221f","behavior":"Hostil","size":"Mediano","description":"Arquero experto que aparece de noche."},
  {"id":"6","name":"Manzana de Oro","type":"ITEM","image":"https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png?04620","behavior":"Regeneración","size":"Consumible","description":"Otorga absorción y regeneración rápida."},
  {"id":"7","name":"Enderman","type":"MOB","image":"https://minecraft.wiki/images/thumb/Enderman_JE3_BE1.png/544px-Enderman_JE3_BE1.png?c6308","behavior":"Neutral","size":"Alto","description":"Se teletransporta y odia que lo miren a los ojos. El agua le hace daño."},
  {"id":"8","name":"Perla de Ender","type":"ITEM","image":"https://minecraft.wiki/images/Ender_Pearl_JE3_BE2.png","behavior":"Teletransporte","size":"Especial","description":"Permite teletransportarse al lanzarla y es clave para fabricar Ojos de Ender."},
  {"id":"9","name":"Ender Dragon","type":"MOB","image":"https://minecraft.wiki/images/Ender_Dragon.gif?fb9ba","behavior":"Hostil","size":"Gigante","description":"La protectora del End. Es el jefe final y el mayor desafío."},
  {"id":"10","name":"Ojo de Ender","type":"ITEM","image":"https://minecraft.wiki/images/Eye_of_Ender_JE2_BE2.png?3e29b","behavior":"Localizador","size":"Especial","description":"Detecta fortalezas ocultas y activa el portal hacia el End."},
  {"id":"11","name":"Warden Boss","type":"MOB","image":"https://minecraft.wiki/images/Warden.gif?d0f99","behavior":"Hostil","size":"Colosal","description":"Guardián ciego de las Ancient Cities. Caza mediante vibraciones."},
  {"id":"12","name":"Estrella del Nether","type":"ITEM","image":"https://minecraft.wiki/images/Nether_Star.gif?fb01f","behavior":"Energía","size":"Legendario","description":"Cristal de energía pura soltado por el Wither. Activa los Faros."},
  {"id":"13","name":"Wither","type":"MOB","image":"https://minecraft.wiki/images/thumb/Wither_JE2_BE2.png/300px-Wither_JE2_BE2.png?60b11","behavior":"Hostil","size":"Grande","description":"El monstruo de tres cabezas explosivo."},
  {"id":"14","name":"Faro","type":"ITEM","image":"https://minecraft.wiki/images/Beacon_JE6_BE2.png?684bf","behavior":"Potenciador","size":"Bloque","description":"Otorga poderes a los jugadores cercanos."},
  {"id":"15","name":"Gallina","type":"MOB","image":"https://minecraft.wiki/images/thumb/Chicken_JE2_BE2.png/300px-Chicken_JE2_BE2.png?30245","behavior":"Pasivo","size":"Pequeño","description":"Ave de granja que proporciona plumas y huevos."},
  {"id":"16","name":"Huevo","type":"ITEM","image":"https://minecraft.wiki/images/Egg_JE2_BE2.png","behavior":"Cocina","size":"Ingrediente","description":"Se usa en pasteles o para intentar generar pollitos."},
  {"id":"17","name":"Vaca","type":"MOB","image":"https://minecraft.wiki/images/thumb/Cow_JE7_BE4.png/300px-Cow_JE7_BE4.png?3de94","behavior":"Pasivo","size":"Mediano","description":"Proporciona cuero y filetes crudos."},
  {"id":"18","name":"Cubo de Leche","type":"ITEM","image":"https://minecraft.wiki/images/Milk_Bucket_JE2_BE2.png","behavior":"Purificación","size":"Consumible","description":"Al beberlo, elimina cualquier efecto de poción activo."},
  {"id":"19","name":"Perro","type":"MOB","image":"https://minecraft.wiki/images/thumb/Tamed_Wolf_with_Red_Collar_JE3_BE4.png/300px-Tamed_Wolf_with_Red_Collar_JE3_BE4.png?0eac6","behavior":"Amigable","size":"Pequeño","description":"Criatura domesticada que atacará a quien dañe a su dueño."},
  {"id":"20","name":"Hueso","type":"ITEM","image":"https://minecraft.wiki/images/Bone_JE3_BE2.png","behavior":"Domesticación","size":"Recurso","description":"Obtenido de esqueletos y usado para domar lobos salvajes."},
  {"id":"21","name":"Gato","type":"MOB","image":"https://minecraft.wiki/images/thumb/Calico_Cat.png/300px-Calico_Cat.png?2555e","behavior":"Pasivo","size":"Pequeño","description":"Mascota ágil que ahuyenta a los Creepers y Fantasmas."},
  {"id":"22","name":"Pescado Crudo","type":"ITEM","image":"https://minecraft.wiki/images/Raw_Cod_JE4_BE2.png?f1cc7","behavior":"Alimento","size":"Consumible","description":"Para alimentar gatos o cocinar."},
  {"id":"23","name":"Cerdo","type":"MOB","image":"https://minecraft.wiki/images/thumb/Saddled_Pig_JE4_BE3.png/300px-Saddled_Pig_JE4_BE3.png?24ef2","behavior":"Pasivo","size":"Mediano","description":"Animal rosado que ama las zanahorias."},
  {"id":"24","name":"Zanahoria en un palo","type":"ITEM","image":"https://minecraft.wiki/images/Carrot_on_a_Stick_JE2_BE2.png?cc4b3","behavior":"Control","size":"Herramienta","description":"Para dirigir cerdos mientras los montas."},
  {"id":"25","name":"Axolote","type":"MOB","image":"https://minecraft.wiki/images/thumb/Axolotl_Idle_Floor_Underwater.gif/400px-Axolotl_Idle_Floor_Underwater.gif?20bba","behavior":"Amigable","size":"Pequeño","description":"El depredador más tierno del océano."},
  {"id":"26","name":"Cubo de Agua","type":"ITEM","image":"https://minecraft.wiki/images/Water_Bucket_JE2_BE2.png","behavior":"Versatilidad","size":"Herramienta","description":"Esencial para cultivar, crear obsidiana o salvarse de caídas."},
  {"id":"27","name":"Aldeano Común","type":"MOB","image":"https://minecraft.wiki/images/thumb/Farmer.png/233px-Farmer.png?972bd","behavior":"Pasivo","size":"Mediano","description":"Habitante de las aldeas que comercia."},
  {"id":"28","name":"Esmeralda","type":"ITEM","image":"https://minecraft.wiki/images/Emerald_JE3_BE3.png","behavior":"Comercio","size":"Moneda","description":"La moneda oficial del comercio."},
  {"id":"29","name":"Evoker","type":"MOB","image":"https://minecraft.wiki/images/thumb/Evoker_JE3.png/200px-Evoker_JE3.png?54321","behavior":"Hostil","size":"Mediano","description":"Hechicero Malvado que invoca fantasmas."},
  {"id":"30","name":"Tótem de Inmortalidad","type":"ITEM","image":"https://minecraft.wiki/images/Totem_of_Undying_JE2_BE2.png","behavior":"Resurrección","size":"Legendario","description":"Evita la muerte al recibir daño letal."},
  {"id":"31","name":"Saqueador","type":"MOB","image":"https://minecraft.wiki/images/thumb/Pillager_JE3.png/300px-Pillager_JE3.png?22662","behavior":"Hostil","size":"Mediano","description":"Miembro agresivo de los Illagers que usa ballesta."},
  {"id":"32","name":"Arco","type":"ITEM","image":"https://minecraft.wiki/images/Bow_JE2_BE1.png?c428a","behavior":"Ataque","size":"Arma","description":"Arma clásica para disparar flechas."},
  {"id":"33","name":"Vindicador","type":"MOB","image":"https://minecraft.wiki/images/Vindicator_JE4.png?48924","behavior":"Hostil","size":"Mediano","description":"Guerrero implacable que persigue a sus enemigos hacha en mano."},
  {"id":"34","name":"Hacha de Hierro","type":"ITEM","image":"https://minecraft.wiki/images/Iron_Axe_JE5_BE2.png?5b5c3","behavior":"Talar","size":"Herramienta","description":"Para madera o combate cuerpo a cuerpo."},
  {"id":"35","name":"Piglin Zombificado","type":"MOB","image":"https://minecraft.wiki/images/thumb/Zombified_Piglin_JE9.png/300px-Zombified_Piglin_JE9.png?b91da","behavior":"Neutral","size":"Mediano","description":"Habitante del Nether que no te atacará a menos que lo golpees."},
  {"id":"36","name":"Pepita de Oro","type":"ITEM","image":"https://minecraft.wiki/images/Gold_Nugget_JE3_BE2.png?ba665","behavior":"Material","size":"Recurso","description":"Pequeños fragmentos usados para fabricar lingotes de oro."},
  {"id":"37","name":"Ghast","type":"MOB","image":"https://minecraft.wiki/images/Ghast_JE3_BE3.gif?ae9fb","behavior":"Hostil","size":"Grande","description":"Enorme criatura voladora que dispara bolas de fuego."},
  {"id":"38","name":"Lágrima de Ghast","type":"ITEM","image":"https://minecraft.wiki/images/Ghast_Tear_JE2_BE2.png?2c989","behavior":"Alquimia","size":"Ingrediente","description":"Indispensable para elaborar pociones de regeneración."},
  {"id":"39","name":"Oveja","type":"MOB","image":"https://minecraft.wiki/images/White_Sheep_JE4_BE7.png?5062a","behavior":"Pasivo","size":"Mediano","description":"Animal pacífico que regenera su lana comiendo pasto."},
  {"id":"40","name":"Tijeras","type":"ITEM","image":"https://minecraft.wiki/images/Shears_JE2_BE2.png?163c5","behavior":"Recolección","size":"Herramienta","description":"Para obtener lana u hojas de árboles."},
  {"id":"41","name":"Panda","type":"MOB","image":"https://minecraft.wiki/images/Playful_Panda_JE1_BE1.png?ba90c","behavior":"Neutral","size":"Grande","description":"Habitantes de las selvas. Les encanta rodar y jugar."},
  {"id":"42","name":"Bambú","type":"ITEM","image":"https://minecraft.wiki/images/Leafless_Old_Bamboo_JE1_BE1.png?f30eb","behavior":"Cultivo","size":"Material","description":"Base para fabricar andamios y combustible."},
  {"id":"43","name":"Tortuga","type":"MOB","image":"https://minecraft.wiki/images/thumb/Turtle_JE3_BE1.png/400px-Turtle_JE3_BE1.png?373f9","behavior":"Pasivo","size":"Mediano","description":"Criatura marina que regresa a su playa para desovar."},
  {"id":"44","name":"Caparazón de Tortuga","type":"ITEM","image":"https://minecraft.wiki/images/thumb/Turtle_Shell_JE1_BE1.png/320px-Turtle_Shell_JE1_BE1.png?32dfc","behavior":"Respiración","size":"Armadura","description":"Otorga el efecto de Respiración Acuática."},
  {"id":"45","name":"Caballo","type":"MOB","image":"https://minecraft.wiki/images/thumb/White_Horse_%28Saddle%29.png/300px-White_Horse_%28Saddle%29.png?74c5e","behavior":"Pasivo","size":"Mediano","description":"El medio de transporte terrestre más veloz."},
  {"id":"46","name":"Silla de Montar","type":"ITEM","image":"https://minecraft.wiki/images/thumb/Saddle_%28Pig%29_JE2_BE2.png/320px-Saddle_%28Pig%29_JE2_BE2.png?310b1","behavior":"Montura","size":"Accesorio","description":"Permite dirigir a caballos, cerdos y otros animales."},
  {"id":"47","name":"Sapo (Rana)","type":"MOB","image":"https://minecraft.wiki/images/Cold_Frog_JE1_BE1.gif?8d948","behavior":"Pasivo","size":"Pequeño","description":"Salta y atrapa pequeños slimes en pantanos."},
  {"id":"48","name":"Bola de Slime","type":"ITEM","image":"https://minecraft.wiki/images/Slimeball_JE2_BE2.png","behavior":"Adhesivo","size":"Material","description":"Material pegajoso para pistones o riendas."},
  {"id":"49","name":"Llama","type":"MOB","image":"https://minecraft.wiki/images/thumb/2.1.16Llama-Creamy-White.png/300px-2.1.16Llama-Creamy-White.png?1ba0e","behavior":"Neutral","size":"Mediano","description":"Animal de carga que puede formar caravanas."},
  {"id":"50","name":"Alfombra","type":"ITEM","image":"https://minecraft.wiki/images/Red_Carpet_JE2_BE2.png?539d3","behavior":"Decorativo","size":"Bloque","description":"Bloque fino para decorar suelos o llamas."},
  {"id":"51","name":"Conejo","type":"MOB","image":"https://minecraft.wiki/images/thumb/Gold_Rabbit_BE4.png/300px-Gold_Rabbit_BE4.png?235b9","behavior":"Pasivo","size":"Pequeño","description":"Criatura rápida y asustadiza de diversos biomas."},
  {"id":"52","name":"Zanahoria","type":"ITEM","image":"https://minecraft.wiki/images/Carrot_JE3_BE2.png?5e9c8","behavior":"Alimento","size":"Consumible","description":"Alimento básico y recurso para domesticación."},
  {"id":"53","name":"Camello","type":"MOB","image":"https://minecraft.wiki/images/thumb/Saddled_Camel_JE1_BE2.png/300px-Saddled_Camel_JE1_BE2.png?8b83a","behavior":"Pasivo","size":"Grande","description":"Montura desértica donde pueden ir dos personas."},
  {"id":"54","name":"Barco","type":"ITEM","image":"https://minecraft.wiki/images/thumb/Oak_Boat_JE4_BE2.png/320px-Oak_Boat_JE4_BE2.png?114d6","behavior":"Transporte","size":"Vehículo","description":"Vehículo para navegar por los océanos."},
  {"id":"55","name":"Golem de Hierro","type":"MOB","image":"https://minecraft.wiki/images/thumb/Iron_Golem_JE2_BE2.png/300px-Iron_Golem_JE2_BE2.png?2cd73","behavior":"Amigable","size":"Grande","description":"Protector de aldeanos contra monstruos nocturnos."},
  {"id":"56","name":"Calabaza","type":"ITEM","image":"https://minecraft.wiki/images/Pumpkin_JE3.png?32a4a","behavior":"Decoración","size":"Bloque","description":"Se puede tallar o usar para crear golems."},
  {"id":"57","name":"Blaze","type":"MOB","image":"https://minecraft.wiki/images/Blaze_BE3.gif?b08d8","behavior":"Hostil","size":"Mediano","description":"Enemigo del Nether que lanza bolas de fuego."},
  {"id":"58","name":"Vara de Blaze","type":"ITEM","image":"https://minecraft.wiki/images/Blaze_Rod_JE1_BE1.png?ae16e","behavior":"Combustible","size":"Material","description":"Recurso vital para la alquimia y portales."},
  {"id":"59","name":"Cubo de Magma","type":"MOB","image":"https://minecraft.wiki/images/thumb/Magma_Cube_JE2_BE2.png/300px-Magma_Cube_JE2_BE2.png?b4389","behavior":"Hostil","size":"Grande","description":"Criatura saltarina que habita en el Nether."},
  {"id":"60","name":"Crema de Magma","type":"ITEM","image":"https://minecraft.wiki/images/Magma_Cream_JE3_BE2.png?7a317","behavior":"Alquimia","size":"Ingrediente","description":"Usada para crear pociones de resistencia al fuego."},
  {"id":"61","name":"Slime","type":"MOB","image":"https://minecraft.wiki/images/thumb/Slime_JE3_BE2.png/300px-Slime_JE3_BE2.png?5b6a7","behavior":"Hostil","size":"Mediano","description":"Se divide en partes pequeñas al recibir daño."},
  {"id":"62","name":"Bloque de Slime","type":"ITEM","image":"https://minecraft.wiki/images/Slime_Block_JE2_BE3.png?57b93","behavior":"Mecánica","size":"Bloque","description":"Rebota objetos y jugadores que caen sobre él."},
  {"id":"63","name":"Shulker","type":"MOB","image":"https://minecraft.wiki/images/Shulker_JE1_BE1.png?02a87","behavior":"Hostil","size":"Mediano","description":"Habitante de las ciudades del End que lanza proyectiles de levitación."},
  {"id":"64","name":"Caja de Shulker","type":"ITEM","image":"https://minecraft.wiki/images/Purple_Shulker_Box_JE4_BE2.png?cdfb4","behavior":"Almacenamiento","size":"Especial","description":"Mantiene los objetos en su interior al ser picada."},
  {"id":"65","name":"Fantasma (Phantom)","type":"MOB","image":"https://minecraft.wiki/images/Phantom_JE2.gif?ed906","behavior":"Hostil","size":"Pequeño","description":"Aparece si el jugador no duerme por varios días."},
  {"id":"66","name":"Membrana de Fantasma","type":"ITEM","image":"https://minecraft.wiki/images/Phantom_Membrane_JE2_BE2.png?b9c3a","behavior":"Reparación","size":"Ingrediente","description":"Para reparar Élitros y crear pociones de caída lenta."},
  {"id":"67","name":"Delfín","type":"MOB","image":"https://minecraft.wiki/images/thumb/Dolphin.gif/440px-Dolphin.gif?2581a","behavior":"Neutral","size":"Mediano","description":"Guía a los jugadores hacia tesoros hundidos."},
  {"id":"68","name":"Bacalao Cocinado","type":"ITEM","image":"https://minecraft.wiki/images/Cooked_Cod_JE4_BE3.png?b495d","behavior":"Alimento","size":"Consumible","description":"Restaura puntos de hambre de forma eficiente."},
  {"id":"69","name":"Calamar","type":"MOB","image":"https://minecraft.wiki/images/Squid_JE2_BE2.gif?8a4c4","behavior":"Pasivo","size":"Mediano","description":"Criatura marina pacífica que suelta tinta."},
  {"id":"70","name":"Saco de Tinta","type":"ITEM","image":"https://minecraft.wiki/images/Ink_Sac_JE2_BE2.png?133f5","behavior":"Tinte","size":"Material","description":"Usado para teñir lana, cristal o cuero de negro."},
  {"id":"71","name":"Araña","type":"MOB","image":"https://minecraft.wiki/images/thumb/Spider_JE5_BE4.png/424px-Spider_JE5_BE4.png?b090e","behavior":"Neutral","size":"Mediano","description":"Hostil en la oscuridad, pacífica bajo la luz del sol."},
  {"id":"72","name":"Ojo de Araña","type":"ITEM","image":"https://minecraft.wiki/images/Spider_Eye_JE2_BE2.png?cc51b","behavior":"Alquimia","size":"Ingrediente","description":"Se fermenta para crear pociones de debilidad o daño."},
  {"id":"73","name":"Bruja","type":"MOB","image":"https://minecraft.wiki/images/thumb/Witch_BE3.png/200px-Witch_BE3.png?97fd5","behavior":"Hostil","size":"Mediano","description":"Ataca lanzando pociones de veneno y lentitud."},
  {"id":"74","name":"Poción de Curación","type":"ITEM","image":"https://minecraft.wiki/images/Potion_of_Healing_JE2_BE2.png?d579c","behavior":"Recuperación","size":"Consumible","description":"Restaura vida de forma instantánea al beberla."},
  {"id":"75","name":"Golem de Nieve","type":"MOB","image":"https://minecraft.wiki/images/thumb/Snow_Golem_JE2_BE2.png/300px-Snow_Golem_JE2_BE2.png?23125","behavior":"Amigable","size":"Mediano","description":"Lanza bolas de nieve para alejar a los monstruos."},
  {"id":"76","name":"Bola de Nieve","type":"ITEM","image":"https://minecraft.wiki/images/Snowball_JE3_BE3.png?8c074","behavior":"Proyectil","size":"Objeto","description":"Proyectil divertido que daña a Blazes y Ghasts."},
  {"id":"77","name":"Zorro","type":"MOB","image":"https://minecraft.wiki/images/thumb/Fox_JE1_BE1.png/300px-Fox_JE1_BE1.png?ebd36","behavior":"Pasivo","size":"Pequeño","description":"Criatura nocturna de los bosques de taiga."},
  {"id":"78","name":"Bayas Dulces","type":"ITEM","image":"https://minecraft.wiki/images/Sweet_Berries_JE1_BE1.png?d29d1","behavior":"Alimento","size":"Consumible","description":"Comida rápida que crece en arbustos espinosos."},
  {"id":"79","name":"Loro","type":"MOB","image":"https://minecraft.wiki/images/thumb/Red_Parrot_JE1_BE1.png/300px-Red_Parrot_JE1_BE1.png?90904","behavior":"Pasivo","size":"Pequeño","description":"Imita los sonidos de monstruos cercanos."},
  {"id":"80","name":"Semillas de Trigo","type":"ITEM","image":"https://minecraft.wiki/images/Wheat_Seeds_JE1_BE1.png?68de8","behavior":"Cultivo","size":"Recurso","description":"Base para cultivar trigo y alimentar gallinas."},
  {"id":"81","name":"Murciélago","type":"MOB","image":"https://minecraft.wiki/images/Bat_JE4_BE3.gif?db68c","behavior":"Pasivo","size":"Pequeño","description":"Habitante inofensivo de las cuevas oscuras."},
  {"id":"82","name":"Antorcha","type":"ITEM","image":"https://minecraft.wiki/images/Torch.gif?8e1d4","behavior":"Iluminación","size":"Herramienta","description":"Evita que aparezcan monstruos en zonas oscuras."},
  {"id":"83","name":"Abeja","type":"MOB","image":"https://minecraft.wiki/images/Bee_BE1.gif?98515","behavior":"Neutral","size":"Pequeño","description":"Poliniza cultivos y produce miel en sus colmenas."},
  {"id":"84","name":"Panal","type":"ITEM","image":"https://minecraft.wiki/images/Honeycomb_JE2_BE2.png?2ecff","behavior":"Material","size":"Recurso","description":"Para fabricar colmenas artificiales o velas."},
  {"id":"85","name":"Oso Polar","type":"MOB","image":"https://minecraft.wiki/images/thumb/Polar_Bear_JE2_BE2.png/300px-Polar_Bear_JE2_BE2.png?29c45","behavior":"Neutral","size":"Grande","description":"Protege ferozmente a sus crías en biomas gélidos."},
  {"id":"86","name":"Salmón Crudo","type":"ITEM","image":"https://minecraft.wiki/images/Raw_Salmon_JE2_BE2.png?db222","behavior":"Alimento","size":"Consumible","description":"Se obtiene pescando en ríos o mares fríos."},
  {"id":"87","name":"Ahogado","type":"MOB","image":"https://minecraft.wiki/images/thumb/Drowned_JE2.png/264px-Drowned_JE2.png?408ba","behavior":"Hostil","size":"Mediano","description":"Variante submarina del zombie que habita en las profundidades."},
  {"id":"88","name":"Tridente","type":"ITEM","image":"https://minecraft.wiki/images/Trident_%28item%29_JE2_BE1.png?6f7d2","behavior":"Ataque","size":"Arma","description":"Arma poderosa para combate acuático y tormentas."},
  {"id":"89","name":"Devastador","type":"MOB","image":"https://minecraft.wiki/images/MCD_Ravager_Idle.gif?5dd5a","behavior":"Hostil","size":"Grande","description":"Bestia de asalto usada por los saqueadores en invasiones."},
  {"id":"90","name":"Montura","type":"ITEM","image":"https://minecraft.wiki/images/thumb/Saddle_%28Pig%29_JE2_BE2.png/320px-Saddle_%28Pig%29_JE2_BE2.png?310b1","behavior":"Montura","size":"Accesorio","description":"Para controlar caballos, cerdos o estriders."},
  {"id":"91","name":"Vex","type":"MOB","image":"https://minecraft.wiki/images/thumb/Vex_JE4.gif/300px-Vex_JE4.gif?da166","behavior":"Hostil","size":"Pequeño","description":"Pequeña criatura voladora invocada por el Evocador."},
  {"id":"92","name":"Lingote de Netherite","type":"ITEM","image":"https://minecraft.wiki/images/Netherite_Ingot_JE1_BE2.png?79364","behavior":"Mejora","size":"Recurso","description":"El material más resistente, no se quema en la lava."},
  {"id":"93","name":"Estrider (Lavagante)","type":"MOB","image":"https://minecraft.wiki/images/Strider_JE2_BE2.gif?f8244","behavior":"Pasivo","size":"Mediano","description":"Permite caminar sobre los lagos de lava del Nether."},
  {"id":"94","name":"Hongo Distorsionado","type":"ITEM","image":"https://minecraft.wiki/images/Warped_Fungus_JE1_BE1.png?95b25","behavior":"Control","size":"Material","description":"Para dirigir a los Estriders usando una caña."},
  {"id":"95","name":"Bruto Piglin","type":"MOB","image":"https://minecraft.wiki/images/thumb/Piglin_Brute_attacking.png/300px-Piglin_Brute_attacking.png?de9ac","behavior":"Hostil","size":"Mediano","description":"Guardián de los bastiones que no se distrae con el oro."},
  {"id":"96","name":"Lingote de Oro","type":"ITEM","image":"https://minecraft.wiki/images/Gold_Ingot_JE4_BE2.png?80cd6","behavior":"Comercio","size":"Recurso","description":"Esencial para el trueque con Piglins."},
  {"id":"97","name":"Calamar Brillante","type":"MOB","image":"https://minecraft.wiki/images/Glow_Squid_JE1.gif?dcad8","behavior":"Pasivo","size":"Mediano","description":"Habitante de cuevas acuáticas que emite luz tenue."},
  {"id":"98","name":"Saco de Tinta Brillante","type":"ITEM","image":"https://minecraft.wiki/images/Glow_Ink_Sac_JE1_BE1.png?d2917","behavior":"Decorativo","size":"Material","description":"Para hacer que los textos en carteles brillen."},
  {"id":"99","name":"Allay","type":"MOB","image":"https://minecraft.wiki/images/Allay_JE2_BE2.gif?aca63","behavior":"Amigable","size":"Pequeño","description":"Recoge objetos del suelo y los entrega al jugador."}
];

async function main() {
  console.log('🌱 Iniciando la carga de datos a Supabase con soporte multiidioma...');

  // Limpiamos tablas hijas y luego padres (el orden importa por las claves foráneas)
  await prisma.itemTranslation.deleteMany();
  await prisma.mobTranslation.deleteMany();
  await prisma.item.deleteMany();
  await prisma.mob.deleteMany();

  const itemsMock = dataLocal.filter(obj => obj.type === "ITEM");
  const mobsMock = dataLocal.filter(obj => obj.type === "MOB");

  // 1. Carga de Items
  console.log('📦 Insertando ítems...');
  for (const item of itemsMock) {
    await prisma.item.create({
      data: {
        imageUrl: item.image,
        ItemTranslation: {
          create: [
            {
              lang: "es",
              name: item.name,
              description: item.description,
              rarity: item.size
            },
            {
              lang: "en",
              name: getEnglishItemName(item.name),
              description: `${item.description} (English translation)`,
              rarity: getEnglishRarity(item.size)
            }
          ]
        }
      }
    });
  }

  // 2. Carga de Mobs
  console.log('🧟 Insertando mobs...');
  for (const mob of mobsMock) {
    await prisma.mob.create({
      data: {
        health: 20,
        imageUrl: mob.image,
        MobTranslation: {
          create: [
            {
              lang: "es",
              name: mob.name,
              description: mob.description,
              type: mob.behavior
            },
            {
              lang: "en",
              name: getEnglishMobName(mob.name),
              description: `${mob.description} (English translation)`,
              type: getEnglishMobType(mob.behavior)
            }
          ]
        }
      }
    });
  }

  console.log('✅ ¡Éxito! Base de datos poblada en español e inglés.');
}

//TODO: Estas son funciones auxiliares que le agrege para simular traducciones en el seed
function getEnglishItemName(name) {
  const translations = {
    "Espada de Diamante": "Diamond Sword",
    "Pico de Diamante": "Diamond Pickaxe",
    "Manzana de Oro": "Golden Apple",
    "Estrella del Nether": "Nether Star",
    "Ojo de Ender": "Eye of Ender",
    "Perla de Ender": "Ender Pearl",
    "Faro": "Beacon",
    "Cubo de Leche": "Milk Bucket",
    "Hueso": "Bone",
    "Pescado Crudo": "Raw Cod",
    "Zanahoria en un palo": "Carrot on a stick",
    "Cubo de Agua": "Water Bucket",
    "Esmeralda": "Emerald",
    "Tótem de Inmortalidad": "Totem of Undying",
    "Arco": "Bow",
    "Hacha de Hierro": "Iron Axe",
    "Pepita de Oro": "Gold Nugget",
    "Lágrima de Ghast": "Ghast Tear",
    "Tijeras": "Shears",
    "Bambú": "Bamboo",
    "Caparazón de Tortuga": "Turtle Shell",
    "Silla de Montar": "Saddle",
    "Bola de Slime": "Slimeball",
    "Alfombra": "Carpet",
    "Zanahoria": "Carrot",
    "Barco": "Boat",
    "Calabaza": "Pumpkin",
    "Vara de Blaze": "Blaze Rod",
    "Crema de Magma": "Magma Cream",
    "Bloque de Slime": "Slime Block",
    "Caja de Shulker": "Shulker Box",
    "Membrana de Fantasma": "Phantom Membrane",
    "Bacalao Cocinado": "Cooked Cod",
    "Saco de Tinta": "Ink Sac",
    "Ojo de Araña": "Spider Eye",
    "Poción de Curación": "Potion of Healing",
    "Bola de Nieve": "Snowball",
    "Bayas Dulces": "Sweet Berries",
    "Semillas de Trigo": "Wheat Seeds",
    "Antorcha": "Torch",
    "Panal": "Honeycomb",
    "Salmón Crudo": "Raw Salmon",
    "Tridente": "Trident",
    "Montura": "Saddle",
    "Lingote de Netherite": "Netherite Ingot",
    "Hongo Distorsionado": "Warped Fungus",
    "Lingote de Oro": "Gold Ingot",
    "Saco de Tinta Brillante": "Glow Ink Sac"
  };
  return translations[name] || `${name} (EN)`;
}

function getEnglishMobName(name) {
  const translations = {
    "Zombie": "Zombie",
    "Creeper": "Creeper",
    "Esqueleto": "Skeleton",
    "Enderman": "Enderman",
    "Ender Dragon": "Ender Dragon",
    "Warden Boss": "Warden Boss",
    "Wither": "Wither",
    "Gallina": "Chicken",
    "Vaca": "Cow",
    "Perro": "Dog",
    "Gato": "Cat",
    "Cerdo": "Pig",
    "Axolote": "Axolotl",
    "Aldeano Común": "Villager",
    "Evoker": "Evoker",
    "Saqueador": "Pillager",
    "Vindicador": "Vindicator",
    "Piglin Zombificado": "Zombified Piglin",
    "Ghast": "Ghast",
    "Oveja": "Sheep",
    "Panda": "Panda",
    "Tortuga": "Turtle",
    "Caballo": "Horse",
    "Sapo (Rana)": "Frog",
    "Llama": "Llama",
    "Conejo": "Rabbit",
    "Camello": "Camel",
    "Golem de Hierro": "Iron Golem",
    "Blaze": "Blaze",
    "Cubo de Magma": "Magma Cube",
    "Slime": "Slime",
    "Shulker": "Shulker",
    "Fantasma (Phantom)": "Phantom",
    "Delfín": "Dolphin",
    "Calamar": "Squid",
    "Araña": "Spider",
    "Bruja": "Witch",
    "Golem de Nieve": "Snow Golem",
    "Zorro": "Fox",
    "Loro": "Parrot",
    "Murciélago": "Bat",
    "Abeja": "Bee",
    "Oso Polar": "Polar Bear",
    "Ahogado": "Drowned",
    "Devastador": "Ravager",
    "Vex": "Vex",
    "Estrider (Lavagante)": "Strider",
    "Bruto Piglin": "Piglin Brute",
    "Calamar Brillante": "Glow Squid",
    "Allay": "Allay"
  };
  return translations[name] || name;
}

function getEnglishRarity(rarity) {
  const translations = {
    "Herramienta": "Tool",
    "Consumible": "Consumable",
    "Especial": "Special",
    "Legendario": "Legendary",
    "Bloque": "Block",
    "Ingrediente": "Ingredient",
    "Recurso": "Resource",
    "Arma": "Weapon",
    "Armadura": "Armor",
    "Accesorio": "Accessory",
    "Vehículo": "Vehicle",
    "Objeto": "Object",
    "Moneda": "Currency"
  };
  return translations[rarity] || rarity;
}

function getEnglishMobType(type) {
  const translations = {
    "Hostil": "Hostile",
    "Neutral": "Neutral",
    "Pasivo": "Passive",
    "Amigable": "Friendly"
  };
  return translations[type] || type;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });