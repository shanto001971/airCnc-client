import Container from "../Shared/Container";
import CategoriesBox from "./CategoriesBox";
import { categories } from "./categoriesData";

const Categories = () => {
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {
                    categories.map(item => (
                        <CategoriesBox key={item.label} label={item.label} icon={item.icon}/>
                    ))
                }
            </div>
        </Container>
    );
};

export default Categories;