import Loader from "@/components/loader";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className='min-h-screen  flex justify-center items-center'>
        <Loader />
    </div>
}