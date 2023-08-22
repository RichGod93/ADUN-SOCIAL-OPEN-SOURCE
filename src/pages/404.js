import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

const NofFound = () => {
    const router = useRouter();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (<div></div>);
};

export default NofFound;