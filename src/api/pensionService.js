import { dmaxApi } from './dmaxApi';

export const pensionService = {
  getMainPageData: async (co_id) => {
    // 💡 1. 'refund' 섹션이 포함된 호출 목록
    const sections = ['main', 'about', 'room', 'aside1', 'special', 'around', 'guide', 'refund'];
    
    try {
      const commonPromises = sections.map(sec => dmaxApi.get('/common_info.php', { co_id, section: sec }));
      const baseInfoPromise = dmaxApi.get('/basic_info.php', { co_id, section: 'base_info' });

      const [commonResponses, baseRes] = await Promise.all([
        Promise.all(commonPromises),
        baseInfoPromise
      ]);

      const rawData = commonResponses.map(res => res.data?.result || res.data || {});
      const base = baseRes.data?.result || baseRes.data || {};
      
      // 💡 2. 중요: 변수 할당 시 마지막에 'ref'를 추가하여 refund 데이터를 받아야 합니다.
      const [m, a, r, b, s, ar, g, ref] = rawData;

      const dbRooms = Array.isArray(r?.rooms) ? r.rooms : (Array.isArray(r) ? r : []);
      const dbSpecials = Array.isArray(s?.specials) ? s.specials : (Array.isArray(s) ? s : []);

      const totalCalendarURL = base.calendar?.mmax_URL || base.booking?.mmax || "";

      const headerInfo = {
        logo: base.logoURL || base.logo || "",
        calendarURL: totalCalendarURL, 
        navigation: {
          roomList: dbRooms.map(room => ({ id: room.room_idx, name: room.room_name })),
          specialList: dbSpecials.map(spec => ({
            id: spec.special_idx,
            name: typeof spec.special_name === 'object' ? spec.special_name.kor : spec.special_name
          }))
        }
      };

      const footerInfo = {
        pensionName: base.pension_name?.kor || base.pensionName || "경주 스테이 꼬리",
        fullAddress: base.fullAddress || `${base.address?.new || ''} ${base.address?.sub || ''}`.trim(),
        addressDetails: {
          new: base.address?.new || "",
          old: base.address?.old || "",
          sub: base.address?.sub || ""
        },
        tel: typeof base.tel === 'object' ? base.tel?.number : (base.tel || ""),
        account: typeof base.account === 'object' ? base.account?.number : (base.account || ""),
        bizInfo: {
          name: base.biz?.name || "",
          number: base.biz?.number || "",
          ceo: base.biz?.ceo || "",
          farm: base.biz?.farm || ""
        },
        bookingLinks: {
          mmax: base.calendar?.mmax_URL || base.booking?.mmax || null,
          ybs: base.calendar?.ybs?.url || base.booking?.ybs || null,
          yeogi: base.calendar?.yeogi?.url || base.booking?.yeogi || null
        }
      };

      return {
        headerInfo,
        footerInfo,
        navigation: headerInfo.navigation, 

        mainImages: m?.imgList?.map(i => ({ 
          imageUrl: i.img_URL, 
          topText: m.sector?.main?.firstLine || "", 
          bottomText: m.sector?.sub?.firstLine || "" 
        })) || [],

        aboutData: a ? { 
          imageUrl: a.imgList?.[0]?.img_URL, 
          description: a.sector?.thirdLine,
          calendarURL: totalCalendarURL // 여기에 추가
        } : null,
        
        bannerData: b ? { 
          image_url: b.imgList?.[0]?.img_URL, 
          title1: b.sector?.main?.firstLine, 
          title2: b.sector?.main?.secondLine,
          desc1: b.sector?.sub?.firstLine || "", 
          desc2: b.sector?.sub?.secondLine || "" 
        } : null,

        dbGuide: g ? {
          cost: g.cost || "",  
          reserve: g.reserve || "", 
          facility: g.facility || "", 
          notice: g.notice || ""   
        } : null,

        // 💡 3. 환불 데이터 매핑 추가
        dbRefund: ref?.refund || null,

        dbRooms: dbRooms.map(room => ({
          ...room,
          calendarURL: totalCalendarURL 
        })),

        specialData: dbSpecials.map(item => ({ 
          id: item.special_idx, 
          title: typeof item.special_name === 'object' ? item.special_name.kor : item.special_name, 
          desc: item.content?.kor || item.content || "", 
          images: item.imgList?.map(img => img.img_URL) || [],
          calendarURL: totalCalendarURL 
        })),

        aroundData: ar,
        baseInfo: { ...footerInfo, logo: headerInfo.logo }
      };
    } catch (error) {
      console.error("pensionService Error:", error);
      throw error;
    }
  }
};