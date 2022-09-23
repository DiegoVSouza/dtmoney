import { Summary } from "../Summary";
import { TransectionsTable } from "../TransactionsTable";
import { Container } from "./styles";

export function Dashboard(){
    return(
        <Container>
            <Summary/>
            <TransectionsTable/>
        </Container>
    )
}