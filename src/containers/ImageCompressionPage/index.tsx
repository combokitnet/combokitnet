import AppLayout from "@/components/AppLayout";

export default function ImageTinyPage() {
  return (
    <AppLayout>
      <div className="pt-[60px]"></div>
      <div className="container mx-auto">
        <div>breadcrum/breadcrum/</div>
        <div className="relative">
          <div className="">
            <img src="" alt="" />
            <div>
              <h2>Name</h2>
              <p>desc</p>
              <div>
                <div>
                  By <span>abc</span>
                </div>
                <div>star</div>
                <div>used</div>
              </div>
            </div>
          </div>
          <div className="absolute right-0">right</div>
        </div>
      </div>
      <div className="container mx-auto">body</div>
      <div className="container mx-auto">footer</div>
    </AppLayout>
  );
}
