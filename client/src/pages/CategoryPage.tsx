import { categories } from "../placeholder/SearchCategories";

function ChannelPage() {
  const category = categories.data[0];
  return (
    <div className="flex-1 flex flex-row">
      <div className="bg-neutral-900 flex-1 text-gray-100">
        <div className="max-w-[200rem] mx-12 mt-12">
          <div className="flex flex-row items-center space-x-4">
            <img src={category.box_art_url} alt={category.name} />
            <div className="">
              <h1>{category.name}</h1>
              <div>
                <p>
                  <span>603K</span> Viewers * <span>20.8M</span> Followers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelPage;
