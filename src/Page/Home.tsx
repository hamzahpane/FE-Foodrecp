import Footer from "../Component/Footer";
import Hero from "../Component/Hero";
import Navbar from "../Component/Navbar";
import RecipeList from "../Component/RecipeList";

const Home = () => {
  return (
    <>
      <div>
        <div className="pt-20">
          <Navbar />
        </div>
        <div className="flex justify-center " id="Hero">
          <Hero />
        </div>
        <div className="justify-center" id="RecipeList">
          <RecipeList />
        </div>
        <div>
          {" "}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
