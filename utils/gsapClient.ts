export const isClient = typeof window !== "undefined";

export let gsap: typeof import("gsap").gsap | null = null;

export async function getGsap() {
  if (!isClient) {
    return null;
  }

  if (gsap) {
    return gsap;
  }

  const [{ gsap: gsapModule }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  gsapModule.registerPlugin(ScrollTrigger);

  gsap = gsapModule;
  return gsap;
}

if (isClient) {
  void getGsap();
}