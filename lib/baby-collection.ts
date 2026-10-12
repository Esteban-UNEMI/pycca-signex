import type { Department, Product } from './types';
export const babyDepartment:Department={id:'bebes',name:'Bebés',slug:'bebes',eyebrow:'Elige con confianza',image:'/baby/crib-natural-v2.webp',subcategories:['Cunas','Colchones y textiles','Baño y cuidado','Paseo']};
const baby=(id:string,name:string,category:string,description:string,price:number,image:string,stock:number):Product=>({id,name,department:'Bebés',category,description,price,image,seller:'PYCCA',stock,rating:0,reviews:0,badge:'Nuevo',featured:false});
export const babyProducts:Product[]=[
 baby('baby-cuna-nido','Cuna convertible Nido Natural','Cunas','Modelo académico de cuna en tonos madera con diseño de barrotes. Imagen y características ilustrativas.',279.90,'/baby/crib-natural-v2.webp',8),
 baby('baby-cuna-luna','Cuna Luna Blanca','Cunas','Modelo académico de cuna blanca para un dormitorio de estilo sencillo y luminoso. Imagen y características ilustrativas.',219.90,'/baby/crib-white-v2.webp',12),
 baby('baby-cuna-colecho','Cuna de colecho Cerca de Ti','Cunas','Modelo académico de cuna compacta junto a la cama. Consulta las especificaciones del fabricante antes de un uso real.',159.90,'/baby/crib-bedside-v2.webp',10),
 baby('baby-cuna-viaje','Cuna de viaje Mini Aventuras','Cunas','Modelo académico de cuna plegable de viaje con paneles de malla. Imagen y características ilustrativas.',129.90,'/baby/crib-travel-v2.webp',9),
 baby('baby-colchon','Colchón para cuna Nube','Colchones y textiles','Colchón de demostración para cuna. La compatibilidad de medidas debe comprobarse en un producto real.',59.90,'/baby/mattress-v2.webp',18),
 baby('baby-sabana','Sábana ajustable Pequeño Bosque','Colchones y textiles','Sábana ajustable de demostración en color salvia. Producto y precio simulados para el proyecto académico.',14.90,'/baby/textiles-v2.webp',24),
 baby('baby-banera','Bañera infantil Primeros Baños','Baño y cuidado','Bañera de demostración en tono suave con diseño compacto. Producto y precio simulados.',34.90,'/baby/bath-v2.webp',15),
 baby('baby-coche','Coche de paseo Paseíto','Paseo','Coche de paseo de demostración con capota y cesta inferior. Imagen y características ilustrativas.',189.90,'/baby/stroller-v2.webp',7),
];
