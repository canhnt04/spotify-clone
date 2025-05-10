import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../contexts/StoreProvider";
import SimpleBar from "simplebar-react";
import { HeartPlus } from "lucide-react";
import Button from "../components/ui/Button/Button";
import LibraryItem from "../components/ui/LibraryItem/LibraryItem";
import { useParams } from "react-router-dom";
import { useSong } from "../components/hooks/useSong";
const VideoDetail = () => {
  const [data, setData] = useState();
  const { defaultVideo, defaulAvatar } = useContext(StoreContext);
  const { id } = useParams();
  const { getDetailSongOrVideo } = useSong();

  const [videos, setVideos] = useState(null);
  const { getVideoSong } = useSong();

  const fetchListVideoSong = async () => {
    const listVideoSong = await getVideoSong();
    if (listVideoSong) {
      setVideos(listVideoSong);
    }
  };

  const fetchVideoDetail = async () => {
    try {
      const res = await getDetailSongOrVideo(id);
      if (res) setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideoDetail();
    fetchListVideoSong();
  }, [id]);
  return (
    <div className="grid grid-cols-[1fr_400px] h-[calc(100vh-100px)] gap-6 p-6 text-white">
      {/* Video content */}
      <div className="rounded-2xl">
        <div className="relative rounded-2xl overflow-hidden">
          <video
            src={data?.video_url}
            controls
            className="w-full h-full rounded-2xl"
          />
        </div>
      </div>

      {/* Right */}
      <div className="relative h-full overflow-hidden rounded-2xl pb-2">
        {/* Video as background */}
        <video
          src={data?.video_url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-t from-[#000]/90 to-[#3a3a3a]/20 z-10" />

        <SimpleBar
          className="h-full z-20 px-5 pt-8 "
          style={{ position: "relative" }}
        >
          <div className="pt-60">
            {/* Tên bài hát */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-extrabold">{data?.title}</h4>
                <p className="text-xs font-bold">{data?.artist}</p>
              </div>
              <button>
                <HeartPlus size={30} strokeWidth={1} />
              </button>
            </div>
            {/* Thông tin người đăng */}
            <div className="flex flex-col my-4 rounded-xl h-[300px] bg-secondary overflow-hidden">
              <div className="relative h-3/4 overflow-hidden">
                <img
                  src={
                    data?.thumbnail_url ||
                    "https://i.scdn.co/image/ab67706f00000002d7021fd3d9b22b9d48145546"
                  }
                  alt="avatar"
                  className="w-full"
                />
                <div className="absolute top-0 w-full h-full rounded-xl bg-gradient-to-b from-[#000]/60 to-[#3a3a3a]/20">
                  <p className="text-md font-bold m-2">
                    Thông tin người đăng tải
                  </p>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between h-1/4 bg-gradient-to-t from-[#000]/60 to-[#3a3a3a]/10">
                <h4 className="text-md font-bold">{data?.artist}</h4>
                <Button to={`/profile/${data?.creator}`}>Trang cá nhân</Button>
              </div>
            </div>
            {/* Danh sách video gợi ý */}
            <div className="flex flex-col my-4 p-2 rounded-xl bg-secondary bg-gradient-to-b from-[#000]/60 to-[#3a3a3a]/20">
              <div className="m-2">
                <h4 className="text-md font-bold">Được đề xuất</h4>
                {videos?.map((video) => (
                  <LibraryItem video={video} />
                ))}
              </div>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default VideoDetail;
