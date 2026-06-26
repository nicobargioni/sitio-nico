import type { IconType } from "react-icons";
import {
  SiPython,
  SiApachespark,
  SiApachehadoop,
  SiApachekafka,
  SiApacheairflow,
  SiDatabricks,
  SiSnowflake,
  SiGooglebigquery,
  SiDbt,
  SiApachehive,
  SiApacheflink,
  SiTrino,
  SiClickhouse,
  SiDuckdb,
  SiApachecassandra,
  SiApacheparquet,
  SiElasticsearch,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiNeo4J,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiDask,
  SiJupyter,
  SiPlotly,
  SiApachesuperset,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiN8N,
} from "react-icons/si";

// Foco en datos / big data / ML. Sin marcas de LLMs (ChatGPT, Gemini, etc.).
const techs: { Icon: IconType; name: string }[] = [
  { Icon: SiPython, name: "Python" },
  { Icon: SiApachespark, name: "Spark" },
  { Icon: SiApachehadoop, name: "Hadoop" },
  { Icon: SiApachekafka, name: "Kafka" },
  { Icon: SiApacheairflow, name: "Airflow" },
  { Icon: SiDatabricks, name: "Databricks" },
  { Icon: SiSnowflake, name: "Snowflake" },
  { Icon: SiGooglebigquery, name: "BigQuery" },
  { Icon: SiDbt, name: "dbt" },
  { Icon: SiApachehive, name: "Hive" },
  { Icon: SiApacheflink, name: "Flink" },
  { Icon: SiTrino, name: "Trino" },
  { Icon: SiClickhouse, name: "ClickHouse" },
  { Icon: SiDuckdb, name: "DuckDB" },
  { Icon: SiApachecassandra, name: "Cassandra" },
  { Icon: SiApacheparquet, name: "Parquet" },
  { Icon: SiElasticsearch, name: "Elasticsearch" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiMongodb, name: "MongoDB" },
  { Icon: SiRedis, name: "Redis" },
  { Icon: SiNeo4J, name: "Neo4j" },
  { Icon: SiPytorch, name: "PyTorch" },
  { Icon: SiTensorflow, name: "TensorFlow" },
  { Icon: SiScikitlearn, name: "scikit-learn" },
  { Icon: SiNumpy, name: "NumPy" },
  { Icon: SiDask, name: "Dask" },
  { Icon: SiJupyter, name: "Jupyter" },
  { Icon: SiPlotly, name: "Plotly" },
  { Icon: SiApachesuperset, name: "Superset" },
  { Icon: SiGooglecloud, name: "Google Cloud" },
  { Icon: SiDocker, name: "Docker" },
  { Icon: SiKubernetes, name: "Kubernetes" },
  { Icon: SiN8N, name: "n8n" },
];

/**
 * Cinta horizontal de tecnologías que corre en loop infinito (CSS puro).
 * La lista se duplica y se desplaza -50% para un bucle sin costuras.
 * Respeta `prefers-reduced-motion` vía la regla global de globals.css.
 */
export default function TechMarquee() {
  const row = [...techs, ...techs];
  return (
    <div
      className="relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]"
      aria-label="Tecnologías con las que trabajo"
    >
      <ul className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <li
            key={i}
            className="flex items-center gap-3 pr-14 shrink-0 text-muted"
            aria-hidden={i >= techs.length}
          >
            <t.Icon size={38} className="text-cyan" />
            <span className="text-base md:text-lg font-medium whitespace-nowrap">
              {t.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
