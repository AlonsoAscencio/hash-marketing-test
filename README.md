# Hash Marketing Dashboard

Dashboard desarrollado en Angular para visualizar campañas publicitarias de diferentes plataformas como Google Ads, Meta Ads y Amazon Ads.

## Tecnologías utilizadas

- Angular 21
- TypeScript
- Tailwind CSS
- NG-ZORRO
- Chart.js / ng2-charts
- Bun

## Instalación

```bash
bun install
```

## Estructura del proyecto

El proyecto está organizado separando responsabilidades para que sea más fácil de mantener y escalar.

* `pages/`: contiene las vistas principales de la aplicación.
* `shared/components/`: contiene componentes reutilizables como header, menú, drawer, cards, filtros, listado de campañas y modal de detalle.
* `domain/models/`: contiene las interfaces y tipos principales del dominio, como `Campaign`, `Metrics`, `Details` e `History`.
* `config/constants/`: contiene el mock local de campañas.
* `states/`: contiene lógica de estado global, como el manejo del tema claro/oscuro.

Decidí estructurarlo así para mantener separada la lógica de negocio, la presentación visual y los datos. También utilicé componentes standalone, signals y computed properties para manejar el estado de forma más simple y reactiva.

## Métricas consideradas clave

Para el dashboard consideré como métricas principales:

* Impresiones
* Clicks
* CTR
* Conversiones
* ROAS
* CPC
* CPM
* CPA
* Tasa de conversión
* Presupuesto gastado

Visualmente prioricé las métricas que ayudan a entender más rápido el rendimiento de una campaña:

1. **ROAS** , porque indica la rentabilidad de la inversión.
2. **Conversiones** , porque muestra los resultados generados.
3. **CTR** , porque ayuda a medir qué tan atractivo es el anuncio.
4. **Presupuesto gastado** , porque permite entender cuánto se ha consumido del presupuesto.
5. **Impresiones y clicks** , porque dan contexto sobre alcance e interacción.

Para la jerarquía visual usé cards, números grandes, badges de estado, tooltips explicativos y una gráfica histórica de conversiones para que el usuario pueda entender la salud de la campaña de forma rápida.

## Integración con APIs reales

Para conectarme a APIs reales usaría servicios separados por plataforma, lo ideal seria conectarme a traves del backend para seguridad de las credenciales, para realizar la conexion con las APIs se requiere de cuentas activas, credenciales, permisos, y establecer reglas de consulta para mantener datos actualizados cada cierto tiempo.

Desventajas:

* Limites en las peticiones
* Cambios de versiones en las API
* Métricas con nombres distintos
* Datos incompletos por permisos insuficientes

## Manejo de diferencias entre plataformas

Para manejar las diferencias que existen en las plataformas lo ideal seria general un modelo generico que abarque los datos mas importantes, y para manejar esos datos utilizaria un mapper, de esta forma independientemente de la plataforma que se use y lla forma en que responde la api se podria manejar todos los casos.

## Decisiones de diseño

Busqué que la interfaz no fuera solo una tabla, sino una vista más visual y moderna. Por eso agregué:

* modo claro y oscuro,
* diseño responsive,
* drawer en mobile,
* sidebar en desktop,
* filtros por plataforma y estado,
* búsqueda por coincidencias,
* modal con detalle de campaña,
* gráfica de conversiones,
* tooltips explicativos,
* y estados de carga/vacío.

La intención fue construir una vista útil para analizar campañas rápidamente y no solo mostrar datos en pantalla.
