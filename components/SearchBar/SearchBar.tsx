/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
* 
*   http://www.apache.org/licenses/LICENSE-2.0
* 
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
'use client'

import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export function SearchBar() {
  const [pagefindReady, setPagefindReady] = useState(false);

  useEffect(() => {
    import('@pagefind/default-ui').then((PagefindUI) => {
      new PagefindUI({
        element: "#search",
        showImages: false,
        basePath: "/_pagefind/", // 👈 ensures correct path
      });
      setPagefindReady(true);
    });
  }, []);

  const handleSearch = () => {
    const searchElement = document.querySelector("#search") as HTMLElement;
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Button
        onClick={handleSearch}
        leftSection={<IconSearch size={20} />}
        variant="subtle"
        disabled={!pagefindReady}
      >
        Search
      </Button>

      {/* Pagefind search box gets injected here */}
      <div id="search" style={{ marginTop: "1rem" }} />
    </>
  );
}
