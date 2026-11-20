/*
  Single source of truth for the library.

  Each animation has:
  - video:    1080p preview with sound (website playback, lazy loaded by Vite as a file URL)
  - poster:   small still frame shown while the video loads
  - download: file name inside /public/downloads (the original 4K source, never compressed)

  To add an animation: encode a 1080p preview into src/videos, a poster into src/assets/posters,
  copy the original into public/downloads, then add an entry below.
*/

import stonePickaxeVideo from '../videos/stone-pickaxe.mp4';
import stonePickaxePoster from '../assets/posters/stone-pickaxe.jpg';
import woodenPickaxeVideo from '../videos/wooden-pickaxe.mp4';
import woodenPickaxePoster from '../assets/posters/wooden-pickaxe.jpg';
import copperPickaxeVideo from '../videos/copper-pickaxe.mp4';
import copperPickaxePoster from '../assets/posters/copper-pickaxe.jpg';
import diamondPickaxeVideo from '../videos/diamond-pickaxe.mp4';
import diamondPickaxePoster from '../assets/posters/diamond-pickaxe.jpg';
import goldenPickaxeVideo from '../videos/golden-pickaxe.mp4';
import goldenPickaxePoster from '../assets/posters/golden-pickaxe.jpg';
import nethritePickaxeVideo from '../videos/nethrite-pickaxe.mp4';
import nethritePickaxePoster from '../assets/posters/nethrite-pickaxe.jpg';
import ironPickaxeVideo from '../videos/iron-pickaxe.mp4';
import ironPickaxePoster from '../assets/posters/iron-pickaxe.jpg';
import heartVideo from '../videos/heart-animation.mp4';
import heartPoster from '../assets/posters/heart-animation.jpg';
import hardcoreHeartVideo from '../videos/hardcore-heart-animation.mp4';
import hardcoreHeartPoster from '../assets/posters/hardcore-heart-animation.jpg';
import clockVideo from '../videos/clock-animation.mp4';
import clockPoster from '../assets/posters/clock-animation.jpg';
import mendingVideo from '../videos/mending-enchantment.mp4';
import mendingPoster from '../assets/posters/mending-enchantment.jpg';

/* Collections group animations. A collection card in the library opens its first animation,
   and the detail page lists the other animations of the same collection below. */
export const COLLECTIONS = [
  { id: 'pickaxe', title: 'Pickaxe' },
  { id: 'heart', title: 'Heart' },
  { id: 'clock', title: 'Clock' },
  { id: 'mending', title: 'Mending' },
];

export const ANIMATIONS = [
  {
    id: 'stone-pickaxe', collectionId: 'pickaxe', title: 'Stone Pickaxe',
    description: 'A Minecraft Stone Pickaxe animation, ready to drop into your edit as a transition or accent.',
    video: stonePickaxeVideo, poster: stonePickaxePoster, download: 'Stone_Pickaxe.mp4',
  },
  {
    id: 'wooden-pickaxe', collectionId: 'pickaxe', title: 'Wooden Pickaxe',
    description: 'A Minecraft Wooden Pickaxe animation, ready to drop into your edit as a transition or accent.',
    video: woodenPickaxeVideo, poster: woodenPickaxePoster, download: 'Wooden_Pickaxe.mp4',
  },
  {
    id: 'copper-pickaxe', collectionId: 'pickaxe', title: 'Copper Pickaxe',
    description: 'A Minecraft Copper Pickaxe animation, ready to drop into your edit as a transition or accent.',
    video: copperPickaxeVideo, poster: copperPickaxePoster, download: 'Copper_Pickaxe.mp4',
  },
  {
    id: 'diamond-pickaxe', collectionId: 'pickaxe', title: 'Diamond Pickaxe',
    description: 'A Minecraft Diamond Pickaxe animation, ready to drop into your edit as a transition or accent.',
    video: diamondPickaxeVideo, poster: diamondPickaxePoster, download: 'Diamond_Pickaxe.mp4',
  },
  {
    id: 'golden-pickaxe', collectionId: 'pickaxe', title: 'Golden Pickaxe',
    description: 'A Minecraft Golden Pickaxe animation, ready to drop into your edit as a transition or accent.',
    video: goldenPickaxeVideo, poster: goldenPickaxePoster, download: 'Golden_Pickaxe.mp4',
  },
  {
    id: 'nethrite-pickaxe', collectionId: 'pickaxe', title: 'Nethrite Pickaxe',
    description: 'A Minecraft Nethrite Pickaxe animation, ready to drop into your edit as a transition or accent.',
    video: nethritePickaxeVideo, poster: nethritePickaxePoster, download: 'Nethrite_Pickaxe.mp4',
  },
  {
    id: 'iron-pickaxe', collectionId: 'pickaxe', title: 'Iron Pickaxe',
    description: 'A Minecraft Iron Pickaxe animation, ready to drop into your edit as a transition or accent.',
    video: ironPickaxeVideo, poster: ironPickaxePoster, download: 'Iron_Pickaxe.mp4',
  },
  {
    id: 'heart-animation', collectionId: 'heart', title: 'Heart Animation',
    description: 'A Minecraft-style heart animation, ready to drop into your edit as a transition or accent.',
    video: heartVideo, poster: heartPoster, download: 'Heart_Animation.mp4',
  },
  {
    id: 'hardcore-heart-animation', collectionId: 'heart', title: 'Hardcore Heart Animation',
    description: 'A hardcore Minecraft-style heart animation, ready to drop into your edit as a transition or accent.',
    video: hardcoreHeartVideo, poster: hardcoreHeartPoster, download: 'Hardcore_Heart_Animation.mp4',
  },
  {
    id: 'clock-animation', collectionId: 'clock', title: 'Clock Animation',
    description: 'A Minecraft-style clock animation, ready to drop into your edit as a transition or accent.',
    video: clockVideo, poster: clockPoster, download: 'Clock_Animation.mp4',
  },
  {
    id: 'mending-enchantment', collectionId: 'mending', title: 'Mending Enchantment',
    description: 'A Minecraft Mending enchantment animation, ready to drop into your edit as a transition or accent.',
    video: mendingVideo, poster: mendingPoster, download: 'Mending_Enchantment.mp4',
  },
];

export function getAnimation(id) {
  return ANIMATIONS.find((a) => a.id === id) || null;
}

export function getCollection(id) {
  return COLLECTIONS.find((c) => c.id === id) || null;
}

export function getCollectionItems(collectionId) {
  return ANIMATIONS.filter((a) => a.collectionId === collectionId);
}
