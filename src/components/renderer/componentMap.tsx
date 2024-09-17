import { Col, Row, Table, Typography } from "antd";
import DataTable from "../ui/server-driven/DataTable";
import Page  from "../ui/server-driven/Page";

const { Text, Title, Paragraph } = Typography;

/**
 * Mapeie aqui os componentes que o renderer vai carregar.
 * lembre-se: as props dos componentes devem ser iguais às props
 * dos componentes do editor. Porque os valores das props definidos
 * vem para os componentes renderizados aqui.
 * Se o componente não estiver mapeado aqui, mesmo que esteja
 * salvo no estado do editor não vai renderizar na página.
 * @param {[key: string]: React.ComponentType<any>} chave (nome componente) e valor (componente)
 * @example 
 * import Body from './components'
 * {Body: (props: BodyProps) => <Body {...props} />}
 */
export const componentMap: { [key: string]: React.ComponentType<any> } = {
  Page: ({ children }: any) => <Page>{children}</Page>,
  DataTable: (props: any) => <DataTable {...props} />,
  Table: (props: any) => <Table {...props} />,
  Row: (props: any) => <Row {...props} />,
  Col: (props: any) => <Col {...props} />,
  Text: (props: any) => <Text {...props}>{props.text}</Text>,
  Title: (props: any) => <Title {...props}>{props.text}</Title>,
  Paragraph: (props: any) => <Paragraph {...props}>{props.text}</Paragraph>
  // Adicione mais componentes aqui...
};
