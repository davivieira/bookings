import Banner from "@/components/Banner/Banner";
import NavBar from "@/components/Nav/NavBar/NavBar";
import SearchForm from "@/components/Search/SearchForm/SearchForm";
import { SCCardContainer, SCHomeContainer } from "@/styles";

function Home() {
  return (
    <>
      <NavBar />
      <SCHomeContainer>
        <SearchForm CardWrapper={SCCardContainer} />
        <Banner />
      </SCHomeContainer>
    </>
  );
}

export default Home;
