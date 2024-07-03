import gitLogo from '../assets/logo.webp'
import ItemRepo from '../components/ItemRepo';
import Input from '../components/Input';
import Button from '../components/Button';
import { Container } from './styles';
import { useState } from 'react';
import { api } from '../services/api';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {  //função assíncrona precisa do await
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id) {
      const isExist = repos.find(repo => repo.id === data.id);  //se repositório já estiver na tela, retorna mensagem
      
        if(!isExist){
      setRepos(prev => [...prev, data]);  //concatenar o que tenho com novo estado
      setCurrentRepo('')  //limpa input
      return  //pára
    }
  }
    alert('Repositório não encontrado')
  }
  const handleRemoveRepo = (id) => {  //botão remover
    setRepos(prev => prev.filter(repo => repo.id !== id));
  };
  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='logo'/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/> 
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
      </Container>
  );
}

export default App;
