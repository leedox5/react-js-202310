import { Container, Table } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

const WordList = ({ words, pageInfo }) => {
  console.log("WordList...");
  if (!words || words.length < 1) {
    return (
      <Container>
        <div className="alert alert-danger text-center">데이터가 없습니다.</div>
      </Container>
    );
  }
  return (
    <Container>
      <Table>
        <thead className="table-dark">
          <tr>
            <th>단어</th>
            <th>의미</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={index}>
              <td>
                <Link to={"/detail/" + word.id} state={pageInfo}>
                  {word.word}
                </Link>
              </td>
              <td>{word.meaning}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default WordList;
